import { render } from "@/browser/render";
import { StrictMode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/browser/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/browser/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/browser/components/ui/select";
import { Input } from "@/browser/components/ui/input";
import { useReplicant } from "@nodecg/react-hooks";
import type { RaffleHappeningNow } from "@/types/happening-now.raffle";
import type { NodeCGAsset } from "@/types/assets";

const RafflePanel: React.FC = () => {
  const [raffle, setRaffle] = useReplicant<RaffleHappeningNow>(
    "happening-now.raffle",
  );
  const [photos] = useReplicant<NodeCGAsset[]>("assets:raffle");

  const form = useForm({
    defaultValues: raffle ?? {
      name: "",
      photo: "",
    },
  });

  return (
    <div className="w-full min-h-96">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((value) => {
            setRaffle(value);
          })}
          className="mx-auto space-y-6"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem de sorteio</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecionar imagem" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectPositioner alignItemWithTrigger>
                    <SelectContent className="grid grid-cols-[repeat(auto-fit,120px)] grid-rows-[repeat(auto-fit,120px)]">
                      {photos?.map((asset) => (
                        <SelectItem
                          className="w-fit"
                          key={asset.url}
                          value={asset.url}
                        >
                          <img src={asset.url} className="h-24" />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectPositioner>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Sorteio</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Nome do sorteio"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Ativar sorteio</Button>
          <Button
            type="button"
            onClick={() => {
              setRaffle(null);
            }}
          >
            Desativar
          </Button>
        </form>
      </Form>
    </div>
  );
};

render(
  <StrictMode>
    <RafflePanel />
  </StrictMode>,
);
