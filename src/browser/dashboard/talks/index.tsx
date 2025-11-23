import { useReplicant } from "@nodecg/react-hooks";
import { Activity, StrictMode, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Clock } from "lucide-react";
import type { Talk, TalkList } from "@/types/list.talk";
import { render } from "@/browser/render";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/browser/components/ui/select";
import type { TalkHappeningNow } from "@/types/happening-now.talk";
import { PhotoSelector } from "@/browser/components/ui/photo-selector";

const TalksPanel: React.FC = () => {
  const [talks, setValue] = useReplicant<TalkList>("list.talk");
  const [talkHappening, setTalkHappening] =
    useReplicant<TalkHappeningNow>("happening-now.talk");
  const [selectedTalkId, setSelectedTalkId] = useState<string | null>();

  const {
    control,
    handleSubmit,
    setValue: setFormValue,
  } = useForm({
    defaultValues: {
      list: talks,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });

  useEffect(() => {
    setFormValue("list", talks);
  }, [talks, setFormValue]);

  return (
    <div className="min-h-96 flex flex-col gap-4">
      <Select<Talk>
        onValueChange={(talk) =>
          talk ? setSelectedTalkId(talk.talkId) : undefined
        }
      >
        <SelectTrigger className="w-full min-h-12">
          <SelectValue placeholder="Selecione uma Talk">
            {(talk?: Talk) => (
              <span className="flex flex-col items-start">
                <span className="block font-medium">{talk?.speaker.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {talk?.talk}
                </span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectPositioner alignItemWithTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Talks</SelectLabel>

              {fields?.map((talk) => (
                <SelectItem key={talk.id} value={talk}>
                  <span className="flex items-center gap-2">
                    <span className="block grow">
                      <span className="block font-medium">
                        {talk.speaker.name.length > 0
                          ? talk.speaker.name
                          : "<novo participante>"}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {talk.talk}
                      </span>
                    </span>
                  </span>
                </SelectItem>
              ))}

              <SelectItem
                onClick={() => {
                  const talkId = crypto.randomUUID();

                  append({
                    talkId,
                    talk: "",
                    description: "",
                    speaker: { name: "" },
                  });

                  setSelectedTalkId(talkId);
                }}
              >
                <span className="flex items-center gap-2 font-medium">
                  Adicionar nova talk
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectPositioner>
      </Select>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(({ list }) =>
          typeof list !== "undefined" ? setValue(list) : null,
        )}
      >
        {fields.map((field, index) => (
          <Activity
            key={field.id}
            mode={field.talkId === selectedTalkId ? "visible" : "hidden"}
          >
            <div className="pt-4 rounded-2xl outline outline-outline-dark bg-card-background/32 overflow-clip">
              <div className="p-4 flex flex-col gap-4">
                <div className="flex gap-4">
                  <Controller
                    control={control}
                    name={`list.${index}.speaker.photo`}
                    render={({ field }) => (
                      <PhotoSelector
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value ?? undefined);
                        }}
                      />
                    )}
                  />

                  <div className="flex flex-col gap-1">
                    <input
                      className="text-base text-text-high w-full"
                      placeholder="Nome"
                      {...control.register(`list.${index}.speaker.name`)}
                      defaultValue={field.speaker.name}
                    ></input>
                    <input
                      className="text-base text-text-medium w-full"
                      placeholder="Empresa"
                      {...control.register(`list.${index}.speaker.company`)}
                      defaultValue={field.speaker.company}
                    ></input>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <Clock className="size-5" />
                  <input
                    type="time"
                    {...control.register(`list.${index}.startsAt`)}
                  />
                </div>

                <textarea
                  className="text-text-high text-bold text-2xl field-sizing-content"
                  placeholder="Nome da talk"
                  {...control.register(`list.${index}.talk`)}
                  defaultValue={field.talk}
                />

                <textarea
                  className="text-base text-text-medium field-sizing-content"
                  placeholder="Descrição da talk"
                  {...control.register(`list.${index}.description`)}
                  defaultValue={field.description}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-2 outline outline-outline-dark bg-card-background rounded-2xl"
            >
              Salvar Talk
            </button>

            <button
              type="button"
              className="w-full p-2 outline outline-outline-dark bg-card-background rounded-2xl"
              onClick={() => remove(index)}
            >
              Deletar Talk
            </button>

            <button
              type="button"
              className="w-full p-2 outline outline-outline-dark bg-card-background rounded-2xl"
              onClick={() => {
                const { id, ...talk } = field;
                setTalkHappening({
                  talk,
                  mode: "now",
                });
                void id;
              }}
            >
              Mostrar como talk "Agora"{" "}
              {talkHappening?.talk.talkId === field.talkId &&
              talkHappening.mode === "now"
                ? "🔴"
                : undefined}
            </button>

            <button
              type="button"
              className="w-full p-2 outline outline-outline-dark bg-card-background rounded-2xl"
              onClick={() => {
                const { id, ...talk } = field;
                setTalkHappening({
                  talk,
                  mode: "soon",
                });
                void id;
              }}
            >
              Mostrar como talk "A seguir"
              {talkHappening?.talk.talkId === field.talkId &&
              talkHappening.mode === "soon"
                ? "🔴"
                : undefined}
            </button>
          </Activity>
        ))}
      </form>

      <button
        type="button"
        className="w-full p-2 outline outline-outline-dark bg-card-background rounded-2xl"
        onClick={() => setTalkHappening(null)}
      >
        Desativar lower-third
      </button>
    </div>
  );
};

render(
  <StrictMode>
    <TalksPanel />
  </StrictMode>,
);
