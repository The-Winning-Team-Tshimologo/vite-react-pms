import React from "react";
import { Progress } from "@/components/ui/progress";

const SPSIgnupProgress = ({ completedPages, page }) => {

  const totalPages = Object.keys(page).length;
  // const completedPages = ;
  const progressPercentage = (completedPages / 100) * 100;

  return (
    <div className="progress__bar sticky top-10 ">
      <p>{`${progressPercentage.toFixed(0)}% Complete`}</p>
      <Progress value={progressPercentage.toFixed(2)} className="pbar" />
      <p
        className={
          page === "Personal Information"
            ? "border-b-2 border-[#576E6A]  w-3/5"
            : ""
        }
      >
        Personal Information
      </p>
      <p
        className={
          page === "Background Check"
            ? "border-b-2 border-[#576E6A]  w-3/5"
            : ""
        }
      >
        Background Check
      </p>

      <p
        className={
          page === "Profile" ? "border-b-2 border-[#576E6A]  w-3/5" : ""
        }
      >
        Profile
      </p>
      {/* <p
        className={
          page === "ID Verification" ? "border-b-2 border-[#576E6A]  w-3/5" : ""
        }
      >
        ID Verification
      </p> */}
      <p
        className={
          page === "Activation" ? "border-b-2 border-[#576E6A]  w-3/5" : ""
        }
      >
        Activation
      </p>
    </div>
  );
};

export default SPSIgnupProgress;
