import { useEffect, useRef, useState } from "react";
import { object, string } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import { separator } from "../../util/Formatting";
import SweetAlert from "../../util/SweetAlert";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import DropDown from "../../part/Dropdown";
import Label from "../../part/Label";
import Input from "../../part/Input";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";

export default function TransaksiPenggunaanAirAdd({ onChangePage }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [listLokasi, setListLokasi] = useState({});

  const formDataRef = useRef({
    lokasi: "",
    volumeAir: "",
    notifikasi: "",
  });

  const fileModulRef = useRef(null);

  const userSchema = object({
    lokasi: string().required("Lokasi harus diisi"),
    volumeAir: string().required("Volume air harus diisi"),  
    notifikasi: string().required("Notifikasi harus diisi")  
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        const data = await UseFetch(
          API_LINK + "MasterLokasi/GetListLokasi",
          {}
        );

        if (data === "ERROR") {
          throw new Error("Terjadi kesalahan: Gagal mengambil daftar lokasi.");
        } else {
          setListLokasi(data);
        }
      } catch (error) {
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
        }));
        setListLokasi({});
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

      try {
        console.log("Sending data:", formDataRef.current);

        const data = await UseFetch(
          API_LINK + "TransaksiPenggunaanAir/CreatePenggunaanAir",
          formDataRef.current
        );

        console.log("Response data:", data);

        if (data === "ERROR") {
          throw new Error(
            "Terjadi kesalahan: Gagal menyimpan data kurs proses."
          );
        } else {
          SweetAlert("Sukses", "Data tagihan berhasil disimpan", "success");
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
            Tambah Data Penggunaan Air
          </div>
          <div className="card-body p-4">
            <div className="row">
                <DropDown
                  forInput="lokasi"
                  label="Lokasi"
                  arrData={listLokasi}
                  isRequired
                  value={formDataRef.current.lokasi}
                  onChange={handleInputChange}
                  errorMessage={errors.lokasi}
                />
                <Input
                  type="text"
                  forInput="volumeAir"
                  label="Volume Air"
                  isRequired
                  name="volumeAir"
                  value={formDataRef.current.volumeAir}
                  onChange={handleInputChange}
                  errorMessage={errors.volumeAir}
                />
                <Input
                  type="text"
                  forInput="notifikasi"
                  label="Notifikasi"
                  isRequired
                  name="notifikasi"
                  value={formDataRef.current.notifikasi}
                  onChange={handleInputChange}
                  errorMessage={errors.notifikasi}
                />
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
