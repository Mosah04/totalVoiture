import React, { useEffect, useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { useFetcher, useLoaderData, Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import confirm from "../../components/Confirmation";
import { Toaster, toast } from "react-hot-toast";
const { REACT_APP_BACKEND_URL } = process.env;

const AnnonceManage = () => {
  const { annonces: annoncesInitial } = useLoaderData();
  const [annonces, setAnnonces] = useState(annoncesInitial);
  console.log("Annonces", annonces);
  const fetcher = useFetcher();
  // console.log("DATA", fetcher.data);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      console.log("Ici ooooh");
      const { annonces: annoncesFetched } = fetcher.data;
      setAnnonces(annoncesFetched);
    }
  }, [fetcher.data]);

  const handleOnDeleteClick = (id) => {
    return async () => {
      console.log("hoge!");
      if (await confirm("Voulez-vous vraiment supprimer cette annonce?")) {
        try {
          toast.loading("Suppression en cours");
          const token = await currentUser.getIdToken(true);
          const response = await fetch(
            `${REACT_APP_BACKEND_URL}/annonces/${id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) {
            console.log(response.status);
            toast.error("Erreur lors de la suppresion!");
            return;
          }
        } catch (error) {
          console.log(error);
          toast.error("Erreur lors de la suppresion!");
          return;
        }
        toast.success("Suppresion réussie!");
        if (fetcher.state === "idle") {
          fetcher.load();
        }
      } else {
        console.log("No");
      }
    };
  };

  return (
    <div>
      <Toaster
        containerClassName="text-center"
        toastOptions={{ duration: 4000 }}
      />
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-white uppercase bg-primary">
          <tr>
            <th scope="col" className="px-4 py-3">
              N°
            </th>
            <th scope="col" className="px-4 py-3">
              Id
            </th>
            <th scope="col" className="px-4 py-3">
              Modèle
            </th>
            <th scope="col" className="px-4 py-3">
              Prix
            </th>
            <th scope="col" className="px-4 py-3">
              Date de publication
            </th>
            <th scope="col" className="px-4 py-3">
              Validation
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="block text-center">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {annonces.length > 0 &&
            annonces.map((annonce, index) => (
              <tr
                key={annonce._id}
                className="border-b transition-hover duration-300 hover:bg-white"
              >
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {annonce._id}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {annonce.detailsVehicule.modele}
                  </span>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {Intl.NumberFormat("bj-BJ", {
                      style: "currency",
                      currency: "XOF",
                    }).format(annonce.prixVehicule)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {new Date(annonce.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`bg-primary-100 text-xs font-medium px-2 py-0.5 ${
                      annonce.validationAdmin
                        ? "text-green-500"
                        : "text-secondary"
                    }`}
                  >
                    {annonce.validationAdmin ? "Validée" : "Non validée"}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-4 px-2">
                    <Link to={`/annonces/${annonce._id}`}>
                      <FaRegEye
                        title="Voir"
                        className="transition-hover duration-300 hover:text-green-500"
                      />
                    </Link>
                    <Link to={`/annonces/${annonce._id}/edit`}>
                      <HiOutlinePencil
                        title="Modifier"
                        className="transition-hover duration-300 hover:text-yellow-500"
                      />
                    </Link>
                    <FaTrashAlt                                                                     
                      title="Supprimer"
                      className="transition-hover duration-300 hover:text-secondary"
                      onClick={handleOnDeleteClick(annonce._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {annonces.length <= 0 && (
        <div className="text-center w-full mt-2">
          Aucune annonce trouvée! Voulez-vous en poster?{" "}
          <span className="text-primary underline">
            <Link to={"/annonces/create"}>C'est par ici.</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default AnnonceManage;
