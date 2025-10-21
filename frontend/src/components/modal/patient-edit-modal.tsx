import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "@/lib/schema/patient";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { patientQueryOptions } from "@/lib/query-options";
import { updatePatient } from "@/lib/api/api";

type FormValues = z.infer<typeof patientSchema>;

export function EditPatientModal({
    patient,
    onClose,
}: {
    patient: FormValues;
    onClose: () => void;
}) {
    const queryClient = useQueryClient();

    const form = useForm<FormValues>({
        resolver: zodResolver(patientSchema),
        defaultValues: patient,
    });

    const mutation = useMutation({
        mutationFn: (values: FormValues) => updatePatient(patient._id!, values),
        onSuccess: () => {
            toast.success("Hasta bilgileri güncellendi");
            queryClient.invalidateQueries({
                queryKey: patientQueryOptions.getPatients().queryKey,
            });
            onClose();
        },
        onError: () => toast.error("Güncelleme başarısız oldu!"),
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values);
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Hasta Bilgilerini Düzenle</DialogTitle>
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
                        {mutation.isPending ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
