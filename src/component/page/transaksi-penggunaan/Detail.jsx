import { useEffect, useRef, useState } from "react";
import { API_LINK, FILE_LINK } from "../../util/Constants";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Label from "../../part/Label";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";

export default function MasterLokasiDetail({ onChangePage, withID }) {
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  const formDataRef = useRef({
    lokasi: "",
    jumlahHulu: "",
    jumlahHilir: "",
    volumeAir: "",
    notifikasi: "",
    tanggalDibuat: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        const data = await UseFetch(
          API_LINK + "TransaksiPenggunaanAir/DetailPenggunaanAirHarian",
          { id: withID }
        );

        if (data === "ERROR" || data.length === 0) {
          throw new Error(
            "Terjadi kesalahan: Gagal mengambil data volume air."
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

  if (isLoading) return <Loading />;

  return (
    <>
      {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )}
      <div className="card">
        <div className="card-header bg-primary fw-medium text-white">
          Detail Data Penggunaan Air Harian
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-lg-4">
              <Label
                forLabel="lokasi"
                title="Lokasi"
                data={formDataRef.current.lokasi}
              />
            </div>
            <div className="col-lg-4">
              <Label
                forLabel="jumlahHulu"
                title="Jumlah Hulu"
                data={formDataRef.current.jumlahHulu}
              />
            </div>
            <div className="col-lg-4">
              <Label
                forLabel="jumlahHulu"
                title="Jumlah Hilir"
                data={formDataRef.current.jumlahHilir}
              />
            </div>
            <div className="col-lg-4">
              <Label
                forLabel="volumeAir"
                title="Volume Air Harian"
                data={formDataRef.current.volumeAir}
              />
            </div>
            <div className="col-lg-4">
              <Label
                forLabel="notifikasi"
                title="Notifikasi"
                data={formDataRef.current.notifikasi}
              />
            </div>
            <div className="col-lg-4">
              <Label
                forLabel="tanggalDibuat"
                title="Tanggal Dibuat"
                data={formDataRef.current.tanggalDibuat}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="float-end my-4 mx-1">
        <Button
          classType="secondary px-4 py-2"
          label="KEMBALI"
          onClick={() => onChangePage("index")}
        />
      </div>
    </>
  );
}
