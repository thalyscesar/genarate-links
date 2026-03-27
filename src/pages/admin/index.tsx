import type z from "zod";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { LinkSchema } from "./schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../components/label";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export type LinkSchemaType = z.infer<typeof LinkSchema>;

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

const defaultValues: LinkSchemaType = {
  linkName: "",
  linkUrl: "",
  linkBackground: "#ff0000",
  linkColor: "#ffffff",
};

export function Admin() {
  const [links, setLinks] = useState<LinkProps[]>([]);

  const methods = useForm<LinkSchemaType>({
    mode: "onSubmit",
    defaultValues,
    resolver: zodResolver(LinkSchema),
  });

  const { handleSubmit, register, watch, setValue } = methods;

  const linkBackground = watch("linkBackground");
  const linkColor = watch("linkColor");
  const linkName = watch("linkName");

  useEffect(() => {
    const linkRef = collection(db, "links");
    const queryRef = query(linkRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const list = [] as LinkProps[];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(list);
    });

    return () => {
      unsub();
    };
  }, []);

  const onSubmit = async (data: LinkSchemaType) => {
    addDoc(collection(db, "links"), {
      name: data.linkName,
      url: data.linkUrl,
      bg: data.linkBackground,
      color: data.linkColor,
      created: new Date(),
    })
      .then(() => {
        setValue("linkName", "");
        setValue("linkUrl", "");
        setValue("linkBackground", "#ff0000");
        setValue("linkColor", "#ffffff");
        console.log("Link created");
      })
      .catch((error) => {
        console.log("Error creating link", error);
      });
  };

  const handleDeleteLink = async (id: string) => {
    await deleteDoc(doc(db, "links", id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />
      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label displayName="Nome do Link" />
        <Input placeholder="Digite o nome do link" {...register("linkName")} />

        <Label displayName="URL do Link" />
        <Input placeholder="Digite a URL do link" {...register("linkUrl")} />

        <section className="flex my-2 gap-5">
          <div className="flex gap-2">
            <Label displayName="Fundo do Link" />
            <Input type="color" {...register("linkBackground")} />
          </div>
          <div className="flex gap-2">
            <Label displayName="Cor do Link" />
            <Input type="color" {...register("linkColor")} />
          </div>
        </section>

        {linkName !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border">
            <Label displayName="Veja como esta ficando:" />
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 mb-2"
              style={{
                backgroundColor: linkBackground,
                marginBottom: 8,
                marginTop: 8,
              }}
            >
              <p className="font-medium" style={{ color: linkColor }}>
                {linkName}
              </p>
            </article>
          </div>
        )}

        <button
          className=" mb-7 bg-blue-600 rounded-md mt-2 h-9 text-white font-medium gap-4 flex justify-center items-center"
          type="submit"
        >
          Cadastrar
        </button>
      </form>

      <div>
        <h2 className="text-white font-bold text-2xl mb-4">Meus links</h2>
      </div>

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between max-w-xl w-11/12 rounded py-3 px-2 mb-2 select-none"
          style={{
            backgroundColor: link.bg,
            color: link.color,
          }}
        >
          <p>{link.name}</p>
          <button
            className="border border-dashed p-1 rounded"
            onClick={() => handleDeleteLink(link.id)}
          >
            <FiTrash size={20} color="#fff" />
          </button>
        </article>
      ))}
    </div>
  );
}
