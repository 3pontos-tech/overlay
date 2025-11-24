import { useReplicant } from "@nodecg/react-hooks";
import { StrictMode, useState } from "react";
import { render } from "@/browser/render";

import type { IntervalSceneTimer } from "@/types/timer.interval-scene";
import { useForm } from "react-hook-form";
import type { IntervalSceneInformation } from "@/types/information.interval-scene";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/browser/components/ui/form";
import { Input } from "@/browser/components/ui/input";
import { Button } from "@/browser/components/ui/button";
import { Textarea } from "@/browser/components/ui/textarea";
import { Timer } from "@/browser/components/timer";

const IntervalScenePanel: React.FC = () => {
  const [intervalTimer, setIntervalTimer] = useReplicant<IntervalSceneTimer>(
    "timer.interval-scene",
  );
  const [sceneInformation, setSceneInformation] =
    useReplicant<IntervalSceneInformation>("information.interval-scene");
  const [currentTimer, setCurrentTimer] = useState(0);

  const form = useForm<IntervalSceneInformation>({
    values: sceneInformation ?? {
      title: "",
      description: "",
    },
  });

  const onSubmit = (value: IntervalSceneInformation) => {
    setSceneInformation(value);
  };

  return (
    <div className="min-h-96 flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="O evento está começará <!em breve!>."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Use <span>{"<! text !>"}</span> para destacar parte do texto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea placeholder="Texto ao lado do relógio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Form>

      <div className="w-full px-4 py-2 outline outline-outline-dark rounded-2xl">
        <div className="flex gap-4 items-center">
          <div className="font-bold border-solid border-r border-outline-dark pr-3 shrink-0">
            <Timer endsAt={intervalTimer ?? undefined} alwaysShow />
          </div>

          <div className="flex gap-4">
            <Input
              type="number"
              min={0}
              defaultValue={currentTimer}
              onValueChange={(time) => setCurrentTimer(Number(time))}
            />
            <Button
              type="button"
              onClick={() =>
                setIntervalTimer(Date.now() + currentTimer * 60000)
              }
            >
              Iniciar
            </Button>
            <Button type="button" onClick={() => setIntervalTimer(null)}>
              Parar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

render(
  <StrictMode>
    <IntervalScenePanel />
  </StrictMode>,
);
