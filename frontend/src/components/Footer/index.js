import "./Footer.css";

function Footer (){
  return (
    <div className="footer-div">
      <div className="social-media">
        <p>Created by Garrett Middleton</p>
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

        
        {/* <a href="https://www.linkedin.com/in/garrettmiddleton/" target="_blank" class="icon brands fa-linkedin"><span class="label">LinkedIn</span></a>
				<a href="https://github.com/gmiddle" target="_blank" class="icon brands fa-github"><span class="label">GitHub</span></a> */}
      </div>
    </div>
  );
};

export default Footer;