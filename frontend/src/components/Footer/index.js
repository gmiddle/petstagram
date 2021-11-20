import "./Footer.css";
function Footer (){
  return (
    <div className="footer-div">
      <div className="social-media">
        <p>Created by: Garrett Middleton</p>
        <a className="icons" href="https://github.com/gmiddle">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="githubLogo"
          />
        </a>
        <a className="icons" href="https://www.linkedin.com/in/garrettmiddleton/">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
            alt="linkedInLogo"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;