import React from "react";
// import { initLoopConnect } from "@loop-crypto/connect";
// initLoopConnect({
//   apiKey: "f0f65a66-290d-4792-b236-92c00fe65cdd",
//   entityId: "ba93f270-9999-4285-b859-9f043c0f3c39",
//   merchantId: "2e566a2e-91c6-45cd-8d41-69a8a71c44e7",
// });
function Loop() {
  return (
    <>
      <div>Loop</div>
      {/* <LoopConnectPayIn
        paymentUsdAmount={199}
        // Other optional props
      /> */}
      <iframe
        src="https://widget.loopcrypto.xyz/?entityId=ba93f270-9999-4285-b859-9f043c0f3c39"
        width="400"
        height="600"
        // frameborder="0"
      ></iframe>
    </>
  );
}

export default Loop;
