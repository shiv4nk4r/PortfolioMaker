import React, { useState, useEffect, useRef } from "react";
import { data } from "../../shivankarSharma";
import Head from "next/head";
import Figlet from "../../components/Figlet/Figlet";
import styles from "./terminal.module.scss";
import { useRouter } from "next/router";
import YouTube from "react-youtube";

function terminal({ userName }) {
  const router = useRouter();
  const inputAreaRef = useRef();
  const [formData, setFormData] = useState(data);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [secretUnlock, setSecretUnlock] = useState(false);
  const [commands, setCommands] = useState([
    { name: "whois", desc: `Who is ${userName}` },
    { name: "experience", desc: `Show ${userName}'s experience` },
    { name: "education", desc: `Show ${userName}'s education` },
    { name: "projects", desc: `Show ${userName}'s projects` },
    { name: "skills", desc: `Show ${userName}'s skills` },
    { name: "contact", desc: `Show ${userName}'s contacts` },
    { name: "secret", desc: `Do not run this command` },
    { name: "help", desc: `You obviously already know what this does` },
    { name: "banner", desc: `Show banner` },
    { name: "clear", desc: `clear terminal` },
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(0);

  useEffect(() => {
    setOutput([showBanner]);
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const showBanner = (
    <p className={styles.p}>
      {<Figlet string={userName} />}
      <div className={styles.color2}>
        Welcome to my interactive web terminal.
      </div>
      <div className={styles.color2}>
        For a list of available commands, type{" "}
        <span className={styles.command}>&apos;help&apos;</span>.
      </div>
    </p>
  );

  const checkIfSubmitCommand = (e) => {
    if (e.key === "Enter") {
      setCommandHistory([...commandHistory, input]);
      setInput("");
      handle();
      setCommandHistoryIndex(commandHistory.length + 1);
    }
    if (e.keyCode === 38) {
      console.log("Up Key Pressed");
      if (commandHistoryIndex === 0) {
        //Do nothing
      } else if (
        commandHistoryIndex > 0 ||
        commandHistoryIndex === commandHistory.length
      ) {
        setInput(commandHistory[commandHistoryIndex - 1]);
        setCommandHistoryIndex(commandHistoryIndex - 1);
      }
    }
    if (e.keyCode === 40) {
      console.log("Down Key Pressed");
      if (commandHistoryIndex === commandHistory.length) {
        setInput("");
        setCommandHistoryIndex(commandHistoryIndex);
      } else if (
        commandHistoryIndex < commandHistory.length ||
        commandHistoryIndex === commandHistory.length
      ) {
        setInput(commandHistory[commandHistoryIndex + 1]);
        setCommandHistoryIndex(commandHistoryIndex + 1);
      }
    }
  };
  const terminalAddress = (command) => (
    <div className={styles.flexDisplay}>
      visitor@prtfl.com/{userName}:~$&nbsp;
      <div className={styles.inputShowBox}>{command}</div>
    </div>
  );

  const handle = () => {
    let comm = terminalAddress(input);
    console.log(input);
    switch (input.replace(/^\s+|\s+$/g, "")) {
      case "help":
        setOutput([...output, comm, showHelp]);
        break;
      case "whois":
        setOutput([...output, comm, showWhoIs]);
        break;
      case "experience":
        setOutput([...output, comm, showExperience]);
        break;
      case "education":
        setOutput([...output, comm, showEducation]);
        break;
      case `projects`:
        setOutput([...output, comm, showProjects]);
        break;
      case "skills":
        setOutput([...output, comm, showSkills]);
        break;
      case "contact":
        setOutput([...output, comm, showSocial]);
        break;
      case "secret":
        setSecretUnlock(true);
        setOutput([...output, comm, showSecret]);
        break;
      case "sudo":
        if (secretUnlock) {
          setOutput([...output, comm, showSudo()]);
        } else {
          let error = commandNotFound(input);
          setOutput([...output, comm, error]);
        }
        break;
      case "banner":
        setOutput([...output, comm, showBanner]);
        break;
      case "clear":
        setOutput([]);
        break;
      case "":
        setOutput([...output, comm]);
        break;
      default:
        let error = commandNotFound(input);
        setOutput([...output, comm, error]);
        break;
    }
  };

  const showSudo = () => {
    // setTimeout(() => {
    //   window.open("https://youtu.be/dQw4w9WgXcQ?autoplay=1", "_ blank");
    // }, 2000);
    return (
      <p className={styles.p}>
        You asked for it...
        <br></br>
        <br></br>
        <div>
          <YouTube
            videoId="dQw4w9WgXcQ"
            opts={{
              playerVars: {
                autoplay: 1,
              },
            }}
          />
        </div>
      </p>
    );
  };

  const showHelp = (
    <p className={styles.p + " " + styles.color2 + " " + styles.mustAnim}>
      {commands.map((item, index) => (
        <div className={styles.flexDisplay} key={item.key}>
          <div className={styles.command}>{item.name}</div> &nbsp;&nbsp;&nbsp;
          <div className={styles.desc}>{item.desc}</div> <br />
        </div>
      ))}
    </p>
  );

  const showWhoIs = (
    <p className={styles.p + " " + styles.color2}>{formData.aboutYou}</p>
  );

  const showSecret = (
    <p className={styles.p}>
      type <span className={styles.command}>&apos;sudo&apos;</span> to unlock
      greatness.
    </p>
  );
  const showExperience = (
    <p>
      {formData.experiences.map((item) => (
        <p key={item.key} className={styles.p}>
          <div className={styles.element}>
            <span className={styles.title}>Role:&nbsp;</span>
            {item.role}
          </div>
          <div className={styles.element}>
            <span className={styles.title}>Org:&nbsp;</span>
            {item.organisation}
          </div>
          <div className={styles.element}>
            <span className={styles.title}>About Role:&nbsp;</span>
            {item.aboutRole}
          </div>
          <div className={styles.element}>
            <span className={styles.title}>Time Period:&nbsp;</span>
            {item.startDate} - {item.isCurrent ? "Current" : item.endDate}
          </div>
        </p>
      ))}
    </p>
  );

  const showProjects = (
    <p>
      {formData.projects.map((item) => (
        <p key={item.key} className={styles.p}>
          <div className={styles.element}>
            <div className={styles.title}>Title:&nbsp;</div>
            {item.title}
          </div>
          <div className={styles.element}>
            <div className={styles.title}>Desc:&nbsp;</div>
            {item.description}
          </div>
          <div className={styles.element}>
            <div className={styles.title}>Link:&nbsp;</div>
            {item.link}
          </div>
        </p>
      ))}
    </p>
  );

  const showEducation = (
    <p>
      {formData.educations.map((item) => (
        <p key={item.key} className={styles.p}>
          <div className={styles.element}>
            <div className={styles.title}>Institution Name:&nbsp;</div>
            {item.insitutionName}
          </div>
          <div className={styles.element}>
            <div className={styles.title}>Degree:&nbsp;</div>
            {item.degree}
          </div>
          <div className={styles.element}>
            <div className={styles.title}>Majors:&nbsp;</div>
            {item.majors}
          </div>
          <div className={styles.element}>
            <div className={styles.title}>Time Period:&nbsp;</div>
            {item.startYear} - {item.isCurrent ? "Current" : item.endYear}
          </div>
        </p>
      ))}
    </p>
  );

  const generateScore = (score, maxRange = 10) => {
    console.log(score);
    let string = "[ ";
    for (let i = 0; i < maxRange; i++) {
      console.log(string);
      if (i <= score) {
        string += "* ";
      } else {
        string += "- ";
      }
    }
    return string + "]";
  };

  const showSkills = (
    <p className={styles.p}>
      {formData.proffessionalSkills.map((item) => (
        <p key={item.key}>
          <div className={styles.element}>
            <div className={styles.title}>Ttiel:&nbsp;</div>
            {item.title}
          </div>
          <div className={styles.element}>
            <div className={styles.title}>Score:&nbsp;</div>
            {generateScore(item.score)}
          </div>
        </p>
      ))}
      <div className={styles.command}>Soft Skills</div>
      {formData.personalSkills.map((item) => (
        <>
          <div className={styles.element}>{item.title}</div>
        </>
      ))}
    </p>
  );

  const commandNotFound = (error) => (
    <p className={styles.p + " " + styles.color2}>
      Command not found. For a list of commands, type{" "}
      <span className={styles.command}>&apos;help&apos;</span>.
    </p>
  );

  const showSocial = (
    <>
      <p className={styles.p}>
        <div className={styles.element}>
          <div className={styles.title}>Email:&nbsp;</div>
          {formData.email}
        </div>
        <div className={styles.element}>
          <div className={styles.title}>Phone:&nbsp;</div>
          {formData.phone}
        </div>
        <div className={styles.element}>
          <div className={styles.title}>Linkedin:&nbsp;</div>
          {formData.linkedin}
        </div>
        <div className={styles.element}>
          <div className={styles.title}>Portfolio URL:&nbsp;</div>
          {formData.portflioURL}
        </div>
        <div className={styles.element}>
          <div className={styles.title}>Website:&nbsp;</div>
          {formData.website}
        </div>
      </p>
    </>
  );

  return (
    <div
      className={styles.terminal}
      onClick={() => {
        inputAreaRef.current.focus();
      }}
    >
      <Head>
        <title>
          {formData.firstName + " " + formData.lastName}&apos;s Portfolio
        </title>
      </Head>
      {output.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <textarea
        value={input}
        typeof="text"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          checkIfSubmitCommand(e);
        }}
        rows={1}
        autoFocus
        className={styles.textareaWrapper}
        ref={inputAreaRef}
      ></textarea>
      <div className={styles.flexDisplay}>
        {terminalAddress("")}
        <div className={styles.flexDisplay}>
          <div className={styles.inputShowBox}>{input}</div>
          <b className={styles.cursor}>█</b>
        </div>
      </div>
    </div>
  );
}

export default terminal;
