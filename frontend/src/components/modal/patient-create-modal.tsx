import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { patientSchema } from "@/lib/schema/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createPatient } from "@/lib/api/api";
import { patientQueryOptions } from "@/lib/query-options";

type FormValues = z.infer<typeof patientSchema>;

interface CreatePatientModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreatePatientModal({
    open,
    onOpenChange,
}: CreatePatientModalProps) {
    const queryClient = useQueryClient();

    const form = useForm<FormValues>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            gender: "",
            dateOfBirth: "",
            medicalHistory: "",
        },
    });

    const mutation = useMutation({
        mutationFn: (values: FormValues) => createPatient(values),
        onSuccess: () => {
            toast.success("Hasta başarıyla oluşturuldu");
            queryClient.invalidateQueries({
                queryKey: patientQueryOptions.getPatients().queryKey,
            });
            form.reset();
            onOpenChange(false);
        },
        onError: (error: any) => {
            console.error("Hasta oluşturulamadı:", error);
            toast.error("Hasta oluşturulamadı!");
        },
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Yeni Hasta Ekle</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4 max-h-[70vh] overflow-y-auto"
                >
                    <div className="grid gap-3">
                        <Label>Ad</Label>
                        <Input {...form.register("firstName")} />
                    </div>

                    <div className="grid gap-3">
                        <Label>Soyad</Label>
                        <Input {...form.register("lastName")} />
                    </div>

                    <div className="grid gap-3">
                        <Label>Cinsiyet</Label>
                        <Select
                            onValueChange={(value) => form.setValue("gender", value)}
                            defaultValue={form.getValues("gender")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Cinsiyet seçiniz" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Erkek</SelectItem>
                                <SelectItem value="female">Kadın</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-3">
                        <Label>Doğum Tarihi</Label>
                        <Input type="date" {...form.register("dateOfBirth")} />
                    </div>

                    <div className="grid gap-3">
                        <Label>E-posta</Label>
                        <Input type="email" {...form.register("email")} />
                    </div>

                    <div className="grid gap-3">
                        <Label>Telefon</Label>
                        <Input {...form.register("phone")} />
                    </div>

                    <div className="grid gap-3">
                        <Label>Adres</Label>
                        <Input {...form.register("address")} />
                    </div>

                    <div className="grid gap-3">
                        <Label>Tıbbi Geçmiş</Label>
                        <Input {...form.register("medicalHistory")} />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-4 cursor-pointer"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Oluşturuluyor..." : "Oluştur"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
