import { lazy } from "react";

const Beranda = lazy(() => import("../page/beranda/Root"));
const MasterTagihan = lazy(() => import("../page/master-tagihan/Root"));
const MasterKomponen = lazy(() => import("../page/master-komponen/Root"));
const MasterLokasi = lazy(() => import("../page/master-lokasi/Root"));
const TransaksiPenggunaanAir = lazy(() => import("../page/transaksi-penggunaan/Root"));

const routeList = [
  {
    path: "/",
    element: <Beranda />,
  },
  {
    path: "/master_lokasi",
    element: <MasterLokasi />,
  },
  {
    path: "/master_tagihan",
    element: <MasterTagihan />,
  },
  {
    path: "/master_komponen",
    element: <MasterKomponen />,
  },
  {
    path: "/transaksi_penggunaan_air",
    element: <TransaksiPenggunaanAir />,
  },
];

export default routeList;
