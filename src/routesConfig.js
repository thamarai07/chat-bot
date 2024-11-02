import { lazy } from "react";
import HomePage from "./pages/homepage/Homepage";
const AsyncOnlineTraining = lazy(() => import("./pages/onlineTraining"));

const AsyncFacultyProfile = lazy(() => import("./pages/aboutMe"));

const AsyncHomepage = HomePage;

const AsyncBlogInnerpage = lazy(() => import("./pages/bloginnerpage"));

const AsyncBlogPage = lazy(() => import("./pages/blog"));

const AsyncCourse = lazy(() => import("./pages/course"));

const AsyncAboutUs = lazy(() => import("./pages/aboutUs/AboutUs"));

const AsyncBlogs = lazy(() => import("./pages/blogs"));

const AsyncBlogsDashboard = lazy(() => import("./pages/blogdashboard"));

const AsyncWeDevelop = lazy(() => import("./pages/weDevelop"));
const AsyncCloudDevelopment = lazy(() => import("./pages/weDevelop/cloudeDevelopment"));
const AsyncMobileDevelopment = lazy(() => import("./pages/weDevelop/mobileDevelopment"))

const AsyncITStaffing = lazy(() => import("./pages/IT_staffing"));
const AsyncITJobDetails = lazy(() =>
  import("./pages/IT_staffing/jobDetails/JobDetailsPage")
);

const LoginPage = lazy(() => import("./pages/myAccount/SignIn"));
const CreateAccount = lazy(() => import("./pages/myAccount/CreateAccount"));
const ResetPassword = lazy(() => import("./pages/myAccount/ResetPassword"));

const MyProfile = lazy(() => import("pages/myAccount/myProfile/MyProfile"));

const AsyncContactUs = lazy(() => import("./pages/contactUs"));

const StudyAbroad = lazy(() => import("./pages/studyAbroad"))

const Gallery = lazy(()=> import("./pages/gallery/Gallery"))

const routesConfig = [
  { path: "/signIn", element: LoginPage },
  { path: "/signUp", element: CreateAccount },
  { path: "/resetPassword", element: ResetPassword },
  { path: "/home", element: AsyncHomepage },
  { path: "/", element: AsyncHomepage },
  { path: "/online-training", element: AsyncOnlineTraining },
  { path: "/online-training/:courseType", element: AsyncOnlineTraining },
  { path: "/online-training/:courseType/:courseId", element: AsyncCourse },
  {
    path: "/online-training/:courseType/:courseId/blog/:blogId",
    element: AsyncBlogInnerpage,
  },
  {
    path: "/online-training/:courseType/:courseId/faculty/:facultyId",
    element: AsyncFacultyProfile,
  },
  { path: "/about-us", element: AsyncAboutUs },
  { path: "/blogs", element: AsyncBlogsDashboard },
  { path: "/blogs/:blogId", element: AsyncBlogPage },
  { path: "/blogs/faculty/:facultyId", element: AsyncFacultyProfile },
  { path: "/webDevelopment", element: AsyncWeDevelop },
  { path: "/webDevelopment/web", element: AsyncWeDevelop },
  { path: "/webDevelopment/cloud", element: AsyncCloudDevelopment },
  { path: "/webDevelopment/mobile", element: AsyncMobileDevelopment },
  { path: "/it-staffing", element: AsyncITStaffing },
  { path: "/it-staffing/job/id/:jobId", element: AsyncITJobDetails },
  { path: "/myProfile/job/id/:jobId", element: AsyncITJobDetails },
  { path: "/contact-us", element: AsyncContactUs },
  { path: "/gallery", element: Gallery },
  { path: "/careers", element: AsyncHomepage },
  { path: "/studyAbroad", element: StudyAbroad },
  { path: "/studyAbroad/:id", element: StudyAbroad },
  { path: "/help", element: AsyncHomepage },
  { path: "*", element: AsyncHomepage },
];

export const authorizedRoutes = [{ path: "/myProfile", element: MyProfile }];

export default routesConfig;
