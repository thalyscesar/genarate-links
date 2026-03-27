import { Social } from "../../components/social";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  doc,
  getDocs,
  collection,
  orderBy,
  query,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinkProps {
  facebook: string;
  youtube: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLink, setSocialLink] = useState<SocialLinkProps>();

  useEffect(() => {
    async function loadLinks() {
      const linkRef = collection(db, "links");
      const queryRef = query(linkRef, orderBy("created", "asc"));

      const docs = await getDocs(queryRef);

      const list = [] as LinkProps[];

      docs.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(list);
    }

    loadLinks();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "social", "link");
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setSocialLink({
          facebook: doc.data().facebook,
          youtube: doc.data().youtube,
          instagram: doc.data().instagram,
        });
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-col w-full pt-4 pb-4 justify-center items-center">
        <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
          TCSYS
        </h1>
        <span className="text-gray-50 mb-5 mt-3 ">Veja Meus Links 😊 </span>
        <main className="flex flex-col w-11/12 max-w-xl text-center">
          {links.map((link) => (
            <section
              className="bg-white mb-4 w-full pt-2 pb-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
              style={{ backgroundColor: link.bg, color: link.color }}
            >
              <a href={link.url}>
                <p className="text-base md:text-lg">{link.name}</p>
              </a>
            </section>
          ))}

          {socialLink && Object.keys(socialLink).length > 0 && (
            <footer className="flex justify-center gap-3 my-4">
              <Social url={socialLink?.facebook || ""}>
                <FaFacebook size={35} color="#FFF" />
              </Social>
              <Social url={socialLink?.youtube || ""}>
                <FaYoutube size={35} color="#FFF" />
              </Social>
              <Social url={socialLink?.instagram || ""}>
                <FaInstagram size={35} color="#FFF" />
              </Social>
            </footer>
          )}
        </main>
      </div>
    </>
  );
}
