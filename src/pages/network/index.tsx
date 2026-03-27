import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import type { NetworkSchemaType } from "./schemas";
import { db } from "../../services/firebaseConnection";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Label } from "../../components/label";

export function Network() {
  const methods = useForm<NetworkSchemaType>();
  const { handleSubmit, register, setValue } = methods;

  useEffect(() => {
    const loadSocialLinks = async () => {
      const docRef = doc(db, "social", "link");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setValue("facebook", data?.facebook);
        setValue("instagram", data?.instagram);
        setValue("youtube", data?.youtube);
      }
    };
    loadSocialLinks();
  }, [setValue]);

  const onsubmit = async (data: NetworkSchemaType) => {
    setDoc(doc(db, "social", "link"), {
      facebook: data.facebook,
      instagram: data.instagram,
      youtube: data.youtube,
    })
      .then(() => {
        console.log("Links salvos com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao salvar links:", error);
      });
  };

  return (
    <>
      <div className=" flex items-center flex-col min-h-screen pb-7 px-2">
        <Header />
        <h1 className="text-white text-2xl mt-8 mb-4 font-medium">
          Minhas redes sociais
        </h1>
        <form
          className="flex flex-col gap 3 max-w-xl w-full"
          onSubmit={handleSubmit(onsubmit)}
        >
          <Label displayName="Link do facebook" />
          <Input
            placeholder="Digite a url do facebook"
            type="url"
            {...register("facebook")}
          />
          <Label displayName="Link do instagram" />
          <Input
            placeholder="Digite a url do instagram"
            type="url"
            {...register("instagram")}
          />

          <Label displayName="Link do Youtube" />
          <Input
            placeholder="Digite a url do youtube"
            type="url"
            {...register("youtube")}
          />
          <button
            className="bg-blue-600 text-white h-9 rounded-md flex justify-center items-center mb-7 font-medium"
            type="submit"
          >
            Salvar
          </button>
        </form>
      </div>
    </>
  );
}
