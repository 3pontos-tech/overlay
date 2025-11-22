import { useReplicant } from "@nodecg/react-hooks";
import { StrictMode, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Clock } from "lucide-react";
import type { TalkList } from "@/types/list.talk";
import { render } from "@/browser/render";

const TalksPanel: React.FC = () => {
  const [value, setValue] = useReplicant<TalkList>("list.talk");

  const {
    control,
    handleSubmit,
    setValue: setFormValue,
  } = useForm({
    defaultValues: {
      list: value,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });

  // TO-DO: Find a way to not have to use a useEffect for updating useForm.
  useEffect(() => {
    setFormValue("list", value);
  }, [value, setFormValue]);

  return (
    <div>
      <form
        onBlur={handleSubmit(({ list }) =>
          typeof list !== "undefined" ? setValue(list) : null,
        )}
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="pt-4 rounded-2xl outline outline-outline-dark bg-card-background/32 overflow-clip"
          >
            <div className="p-4 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="size-15 rounded-full outline outline-outline-dark mb-3"></div>
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

            <div className="py-1.5 px-4 bg-outline-light w-full">
              <button
                type="button"
                className="bg-black px-2 text-sm font-bold rounded-md"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </form>

      <button
        type="button"
        className="w-full p-2 outline outline-outline-dark bg-card-background rounded-2xl"
        onClick={() =>
          append({
            talk: "",
            description: "",
            speaker: { name: "" },
          })
        }
      >
        Add Email
      </button>
    </div>
  );
};

render(
  <StrictMode>
    <TalksPanel />
  </StrictMode>,
);
