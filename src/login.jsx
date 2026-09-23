import LoginImage from "./image.jsx";

export default function LoginPage(){
    return(
        <>
    <div id="container">
      <div className="logindata">
        <div className ="heading">
          <h1>CorpCart</h1>
          <p>Login with your corporate credentials to access exclusive goodies </p>
        </div>
        <form id="loginform">
          <label> Email Id </label>
          <br />
          <input type="email" placeholder="Enter your email ID" />
          <br />
          <br />
          <label> Password </label>
          <br />
          <input type="password" placeholder="Enter your password" />
          <br />
          <br />
          <input type="submit" onClick="handlelogin()" />
        </form>
      </div>

      <LoginImage />
      </div>
    </>
  );
}

