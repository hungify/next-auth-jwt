"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

interface User {
	fullName: string;
	email: string;
	role: string;
}

const AuthContext = createContext<{
	user: User | null;
	setUser: (user: User | null) => void;
	clearUser: () => void;
	isAuthenticated: boolean;
}>({
	user: null,
	setUser: () => {},
	isAuthenticated: false,
	clearUser: () => {},
});

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUserState] = useState<User | null>(() => {
		return null;
	});
	const isAuthenticated = Boolean(user);

	const setUser = useCallback((user: User | null) => {
		setUserState(user);
		localStorage.setItem("user", JSON.stringify(user));
	}, []);

	const clearUser = useCallback(() => {
		setUser(null);
		localStorage.removeItem("user");
	}, [setUser]);

	useEffect(() => {
		const _user = localStorage.getItem("user");
		setUserState(_user ? JSON.parse(_user) : null);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				clearUser,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
