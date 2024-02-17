import IssueDetailPage from "@pages/issueDetail";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "issue/:id",
        element: <IssueDetailPage />,
      },
    ],
  },
]);

export default router;
