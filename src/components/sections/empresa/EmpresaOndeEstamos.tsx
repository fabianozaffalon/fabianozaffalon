import { RegionMap } from "@/components/sections/RegionMap";

export function EmpresaOndeEstamos() {
  return (
    <section id="onde-estamos" className="bg-[#EFEFEF] py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-12">
        <RegionMap />
      </div>
    </section>
  );
}
