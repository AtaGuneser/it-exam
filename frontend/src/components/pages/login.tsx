import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

const loginSchema = z.object({
    email: z.string().email("Geçerli bir email giriniz"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export function LoginPage() {
    const setToken = useAuthStore((s) => s.setToken);
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
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
        <div className="min-h-screen flex items-center justify-center bg-muted/20">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">Giriş Yap</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Input placeholder="Email" {...form.register("email")} />
                            {form.formState.errors.email && (
                                <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <Input type="password" placeholder="Şifre" {...form.register("password")} />
                            {form.formState.errors.password && (
                                <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">Giriş Yap</Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center text-sm text-muted-foreground">
                    Hesabın yok mu? Şimdilik sadece admin erişimi mevcut.
                </CardFooter>
            </Card>
        </div>
    );
}
