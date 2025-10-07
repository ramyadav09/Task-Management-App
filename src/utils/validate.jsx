export const checkValidData = (email, password, name) => {
  if (!email?.trim()) return "Email is required";
  if (!password?.trim()) return "Password is required";
  if (name !== null && !name?.trim()) return "Full name is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";

  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/(?=.*[a-z])/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password))
    return "Password must contain at least one number";

  if (name !== null && name.length < 2)
    return "Full name must be at least 2 characters";

  return null;
};
