import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { loginSchema } from "@/lib/schema/auth";

export function LoginPage() {
    const setToken = useAuthStore((s) => s.setToken);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "ata@example.com", password: "123456" },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, values);
            setToken(res.data.token);
            await router.navigate({ to: "/patients" });
        } catch (err: any) {
            alert(err.response?.data?.message || "Giriş başarısız");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
            <Card className="w-full max-w-sm shadow-lg border rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">Giriş Yap</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <Input
                                placeholder="Email"
                                {...form.register("email")}
                                className="h-11 text-base"
                            />
                            {form.formState.errors.email && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="relative space-y-2">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Şifre"
                                {...form.register("password")}
                                className="h-11 text-base pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {form.formState.errors.password && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full h-11 text-base font-medium gap-2 cursor-pointer hover:scale-[1.02] transition-transform">
                            <LogIn size={18} />
                            Giriş Yap
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="text-center text-sm text-muted-foreground flex flex-col gap-1">
                    <p>Hızlı giriş için inputlar dolu</p>
                </CardFooter>
            </Card>
        </div>
    );
}
