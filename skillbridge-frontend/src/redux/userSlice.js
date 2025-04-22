import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный экшен для получения данных профиля
export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().user.token || sessionStorage.getItem("token");
        if (!token) {
            return rejectWithValue("No token available.");
        }
        const response = await axios.get("http://localhost:8080/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Не удалось загрузить данные пользователя.");
    }
});

// Асинхронный экшен для регистрации
export const registerUser = createAsyncThunk(
    "user/register",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", formData);
            return response.data;  // Assuming this returns the JWT token
        } catch (error) {
            return rejectWithValue(error.response.data.error || "Ошибка регистрации");
        }
    }
);

// Асинхронный экшен для логина
export const loginUser = createAsyncThunk("user/login", async (formData, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/login", formData);
        if (response.data.token) {
            sessionStorage.setItem("token", response.data.token);
            // Dispatch fetchUserProfile after successful login to get user data
            dispatch(fetchUserProfile());
            return { token: response.data.token }; // Return the token in the payload
        }
        throw new Error("Ошибка входа");
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Неверный email или пароль.");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null, // Store the JWT token here
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            sessionStorage.removeItem("token");
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Получение профиля
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Регистрация
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = "Регистрация успешна!";
                state.token = action.payload; // Assuming registration also returns the token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //логин
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token; // Store the token in the state
                // Note: User data is now handled by fetchUserProfile
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setToken } = userSlice.actions;
export default userSlice.reducer;