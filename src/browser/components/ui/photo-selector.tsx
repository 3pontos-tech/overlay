import type { NodeCGAsset } from "@/types/assets";
import { useReplicant } from "@nodecg/react-hooks";
import { useState } from "react";

export const PhotoSelector: React.FC<{
  value?: string;
  onValueChange?: (value: string | null) => unknown;
}> = ({ value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [photos] = useReplicant<NodeCGAsset[]>("assets:speakers");

  const setPhoto = (url: string | null) => {
    setOpen(false);
    onValueChange?.(url);
  };

  return (
    <>
      <button
        type="button"
        className="size-15 rounded-full outline outline-outline-dark bg-cover"
        style={{ backgroundImage: value ? `url(${value})` : "none" }}
        onClick={() => {
          setOpen((previousState) => !previousState);
        }}
      ></button>
      <div
        data-open={open}
        className="not-data-[open=true]:hidden fixed inset-3 bg-outline-light outline outline-outline-dark rounded-2xl p-4 h-fit max-h-full data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 overflow-x-hidden overflow-y-auto"
      >
        <div className="grid gap-3.5 grid-cols-[repeat(auto-fit,60px)] grid-rows-[repeat(auto-fit,60px)]">
          <button
            type="button"
            className="outline size-15 rounded-full relative data-checked:outline-primary data-checked:outline-2"
            onClick={() => setPhoto(null)}
          ></button>

          {photos?.map(({ url }) => (
            <button
              key={url}
              type="button"
              className="outline size-15 rounded-full relative data-checked:outline-primary data-checked:outline-2 bg-cover"
              style={{ backgroundImage: `url(${url})` }}
              onClick={() => {
                setPhoto(url);
              }}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
};
