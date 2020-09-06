import { lazy } from 'react';

const HomePage = lazy(() => import(/* webpackChunkName: "Home" */'../Pages/Home'));
const ViewRides = lazy(() => import(/* webpackChunkName: "ViewRides" */'../Pages/Rides/ViewRides'));
const BookingRide = lazy(() => import(/* webpackChunkName: "BookingRide" */'../Pages/Rides/PickRide'));
const BookingProcess = lazy(() => import(/* webpackChunkName: "BookingProcess" */'../Pages/Rides/PickRide/Process'));
const StaffPage = lazy(() => import(/* webpackChunkName: "StaffPage" */'../Pages/Staff/ViewStaff'));
const AddStaffPage = lazy(() => import(/* webpackChunkName: "AddStaffPage" */'../Pages/Staff/AddStaff'));
const EditStaffPage = lazy(() => import(/* webpackChunkName: "EditStaffPage" */'../Pages/Staff/EditStaff'));
const DeletedStaffPage = lazy(() => import(/* webpackChunkName: "DeletedStaffPage" */'../Pages/Staff/deletedStaff'));
const ViewVehiclePage = lazy(() => import(/* webpackChunkName: "ViewVehiclePage" */'../Pages/Vehicles/ViewVehicles'));
const AddVehiclePage = lazy(() => import(/* webpackChunkName: "AddVehiclePage" */'../Pages/Vehicles/AddVehicle'));
const EditVehiclePage = lazy(() => import(/* webpackChunkName: "EditVehiclePage" */'../Pages/Vehicles/EditVehicle'));
const DeletedVehiclePage = lazy(() => import(/* webpackChunkName: "DeletedVehiclePage" */'../Pages/Vehicles/DeletedVehicles'));
const ViewHotelsPage = lazy(() => import(/* webpackChunkName: "ViewHotelsPage" */'../Pages/Hotels/ViewHotels'));
const EditHotelPage = lazy(() => import(/* webpackChunkName: "EditHotelPage" */'../Pages/Hotels/EditHotel'));
const DeletedHotels = lazy(() => import(/* webpackChunkName: "DeletedHotels" */'../Pages/Hotels/DeletedHotels'));
const ViewCorporatesPage = lazy(() => import(/* webpackChunkName: "ViewCorporatesPage" */'../Pages/Corporate/ViewCorporates'));
const EditCorporatesPage = lazy(() => import(/* webpackChunkName: "EditCorporatesPage" */'../Pages/Corporate/EditCorporate'));
const DeletedCorporatesPage = lazy(() => import(/* webpackChunkName: "DeletedCorporatesPage" */'../Pages/Corporate/DeletedCorporates'));
const ViewSuppliersPage = lazy(() => import(/* webpackChunkName: "ViewSuppliersPage" */'../Pages/Suppliers/ViewSuppliers'));
const DeletedSuppliersPage = lazy(() => import(/* webpackChunkName: "DeletedSuppliersPage" */'../Pages/Suppliers/DeletedSuppliers'));
const EditSupplierPage = lazy(() => import(/* webpackChunkName: "EditSupplierPage" */'../Pages/Suppliers/EditSupplier'));
const ViewSliderPage = lazy(() => import(/* webpackChunkName: "ViewSliderPage" */'../Pages/HomeSlider/ViewSlider'));
const AddSliderPage = lazy(() => import(/* webpackChunkName: "AddSliderPage" */'../Pages/HomeSlider/AddSlider'));
const EditSliderPage = lazy(() => import(/* webpackChunkName: "EditSliderPage" */'../Pages/HomeSlider/EditSlider'));
const PolicyEdit = lazy(() => import(/* webpackChunkName: "PolicyEdit" */'../Pages/PolicyEdit'));
const ErrorPage = lazy(() => import(/* webpackChunkName: "ErrorPage" */'../Pages/ErrorPage'));

const mainRoutes = [
  {
    path: '/',
    component: HomePage,
  },
  // Staff Pages
  {
    path: '/staff',
    component: StaffPage,
  },
  {
    path: '/staff/add-new',
    component: AddStaffPage,
  },
  {
    path: '/staff/:type/:id',
    component: EditStaffPage,
  },
  {
    path: '/staff/deleted',
    component: DeletedStaffPage,
  },
  // Vehicle Pages
  {
    path: '/vehicles',
    component: ViewVehiclePage,
  },
  {
    path: '/vehicle/add-new',
    component: AddVehiclePage,
  },
  {
    path: '/vehicles/:id',
    component: EditVehiclePage,
  },
  {
    path: '/vehicle/deleted',
    component: DeletedVehiclePage,
  },
];

const adminAndSuperAfminRoutes = [
  // Slider Pages
  {
    path: '/homeNews',
    component: ViewSliderPage,
  },
  {
    path: '/homeNews/add-new',
    component: AddSliderPage,
  },
  {
    path: '/homeNews/:id',
    component: EditSliderPage,
  },
  // Edit policy page
  {
    path: '/edit-policy',
    component: PolicyEdit,
  },
  // Hotel Pages
  {
    path: '/hotels',
    component: ViewHotelsPage,
  },
  {
    path: '/hotels/deleted',
    component: DeletedHotels,
  },
  {
    path: '/hotels/:id',
    component: EditHotelPage,
  },
  // Corporate Pages
  {
    path: '/corporates',
    component: ViewCorporatesPage,
  },
  {
    path: '/corporate/deleted',
    component: DeletedCorporatesPage,
  },
  {
    path: '/corporate/:id',
    component: EditCorporatesPage,
  },
  // Supplier Page
  {
    path: '/suppliers',
    component: ViewSuppliersPage,
  },
  {
    path: '/suppliers/deleted',
    component: DeletedSuppliersPage,
  },
  {
    path: '/suppliers/:id',
    component: EditSupplierPage,
  },
];

const hotelAndCorporateRoutes = [
  {
    path: '/rides',
    component: ViewRides,
  },
  {
    path: '/rides/pick-ride',
    component: BookingRide,
  },
  {
    path: '/rides/booking-process',
    component: BookingProcess,
  },
];

const lastRoutes = [
  // Error Page
  {
    path: '/error',
    component: ErrorPage,
  },
  // Auth
  {
    path: ['/login', '/register', '/verify-code', '/forgot-password', '/reset-password'],
    component: null,
    redirect: true,
    to: '/',
  },
  // rediret to 404 page
  {
    path: '/*',
    component: null,
    redirect: true,
    to: '/error',
  },
];

export {
  mainRoutes,
  adminAndSuperAfminRoutes,
  lastRoutes,
  hotelAndCorporateRoutes,
};
