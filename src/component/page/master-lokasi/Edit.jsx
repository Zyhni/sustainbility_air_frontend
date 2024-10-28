import { useEffect, useRef, useState } from "react";
import { object, string } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import SweetAlert from "../../util/SweetAlert";
import UseFetch from "../../util/UseFetch";
import UploadFile from "../../util/UploadFile";
import Button from "../../part/Button";
import DropDown from "../../part/Dropdown";
import Input from "../../part/Input";
import FileUpload from "../../part/FileUpload";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";


export default function MasterLokasiEdit({ onChangePage, withID }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  const formDataRef = useRef({
    idLokasi: "",
    namaGedung: "",
    lantai: "",
    jumlahHulu: "",
    jumlahHilir: "",
  });


  const userSchema = object({
    namaGedung: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    lantai: string().required("harus diisi"),
    jumlahHulu: string().required("harus diisi"),
    jumlahHilir: string().required("harus diisi"),
  });


  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        const data = await UseFetch(
          API_LINK + "MasterLokasi/GetDataLokasiById",
          { id: withID }
        );

        if (data === "ERROR" || data.length === 0) {
          throw new Error(
            "Terjadi kesalahan: Gagal mengambil data lokasi."
          );
        } else {
          formDataRef.current = { ...formDataRef.current, ...data[0] };
        }
      } catch (error) {
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, userSchema);
    formDataRef.current[name] = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  // const handleFileChange = async (ref, extAllowed) => {
  //   const { name, value } = ref.current;
  //   const file = ref.current.files[0];
  //   const fileName = file.name;
  //   const fileSize = file.size;
  //   const fileExt = fileName.split(".").pop();
  //   const validationError = await validateInput(name, value, userSchema);
  //   let error = "";

  //   if (fileSize / 1024576 > 10) error = "berkas terlalu besar";
  //   else if (!extAllowed.split(",").includes(fileExt))
  //     error = "format berkas tidak valid";

  //   if (error) ref.current.value = "";

  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [validationError.name]: error,
  //   }));
  // };

  const handleAdd = async (e) => {
    e.preventDefault();

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors
    );

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError((prevError) => ({ ...prevError, error: false }));
      setErrors({});

      // const uploadPromises = [];

      // if (fileGambarRef.current.files.length > 0) {
      //   uploadPromises.push(
      //     UploadFile(fileGambarRef.current).then(
      //       (data) => (formDataRef.current["gambarAlatMesin"] = data.Hasil)
      //     )
      //   );
      // }

      try {
        // await Promise.all(uploadPromises);

        const data = await UseFetch(
          API_LINK + "MasterLokasi/EditLokasi",
          formDataRef.current
          
        );
        

        if (data === "ERROR") {
          throw new Error(
            "Terjadi kesalahan: Gagal menyimpan data lokasi."
          );
        } else {
          SweetAlert("Sukses", "Data lokasi berhasil disimpan", "success");
          onChangePage("index");
        }
      } catch (error) {
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )}
      <form onSubmit={handleAdd}>
        <div className="card">
          <div className="card-header bg-primary fw-medium text-white">
            Ubah Data Lokasi
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="namaGedung"
                  label="Nama Gedung"
                  isRequired
                  value={formDataRef.current.namaGedung}
                  onChange={handleInputChange}
                  errorMessage={errors.namaGedung}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="lantai"
                  label="Lantai"
                  isRequired
                  value={formDataRef.current.lantai}
                  onChange={handleInputChange}
                  errorMessage={errors.lantai}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="jumlahHulu"
                  label="Jumlah Hulu"
                  isRequired
                  value={formDataRef.current.jumlahHulu}
                  onChange={handleInputChange}
                  errorMessage={errors.jumlahHulu}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="jumlahHilir"
                  label="Jumlah Hilir"
                  isRequired
                  value={formDataRef.current.jumlahHilir}
                  onChange={handleInputChange}
                  errorMessage={errors.jumlahHilir}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="float-end my-4 mx-1">
          <Button
            classType="secondary me-2 px-4 py-2"
            label="BATAL"
            onClick={() => onChangePage("index")}
          />
          <Button
            classType="primary ms-2 px-4 py-2"
            type="submit"
            label="SIMPAN"
          />
        </div>
      </form>
    </>
  );
}
