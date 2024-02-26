import IssueDetailPage from "@pages/issueDetail";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DeleteAccountPage from "@pages/deletetAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "issue/:id",
        element: <IssueDetailPage />,
      },
      {
        path: "quit/delete",
        element: <DeleteAccountPage />,
      },
    ],
  },
]);

export default router;
