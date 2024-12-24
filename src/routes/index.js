import config from '~/config';


import HomeAdmin from '~/pages/Admin/Home';
import QLDH from '~/pages/Admin/QLDH';
import QLKH from '~/pages/Admin/QLKH';
import QLVN from '~/pages/Admin/QLNV';
import QLSP from '~/pages/Admin/QLSP';
import EditSP from '~/pages/Admin/QLSP/EditSP';
import Login from '~/pages/Login';
import CartShopping from '~/pages/Public/CartShopping';
import Home from '~/pages/Public/Home';
import InforProduct from '~/pages/Public/InforProduct';
import LichSuDonHang from '~/pages/Public/LichSuDonHang';
import Product from '~/pages/Public/SanPham';

const publicRoutes = [
     { path: config.routes.home, component: Home},
     { path: config.routes.login, component: Login},
     { path: config.routes.dssp, component: Product},
     { path: config.routes.ttsp, component: InforProduct},
     { path: config.routes.giohang, component: CartShopping},
     { path: config.routes.lsdh, component: LichSuDonHang},
    
];

const privateRoutes = [
 
    { path: config.routes.homeAdmin, component: HomeAdmin},
    { path: config.routes.qlnv, component: QLVN },
    { path: config.routes.qlsp, component: QLSP },
    { path: config.routes.editSP, component: EditSP },
    { path: config.routes.qldh, component: QLDH },
    { path: config.routes.qlkh, component: QLKH},
];

export { publicRoutes, privateRoutes };
