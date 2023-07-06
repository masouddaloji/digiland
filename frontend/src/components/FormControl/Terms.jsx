import { useEffect, useState } from "react";
//persian text
import { persianTexts } from "../../text";


const Terms = ({setIsAccept,isError}) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  
useEffect(()=>{
setIsAccept(acceptTerms)
},[acceptTerms])

  return (
    <>
      <div className="termsAndConditions">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={acceptTerms}
          onChange={() =>setAcceptTerms(!acceptTerms)}
        />
        من شرایط و مقررات سایت را خوانده ام و آن را می پذیرم.
      </div>
      {isError && !acceptTerms ? (
        <span className="auth__error">{persianTexts.checkInformation.acceptTerms.required}</span>
      ) : null}
    </>
  );
};

export default Terms;
