import React, { useEffect, useState, useRef } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  APLHABETS,
  NUMBERS,
  SPECIAL_CHARACTERS,
  optionsState,
} from "@/utils/constants";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const App = () => {
  const [lowerCase, setLowerCase] = useState<boolean>(false);
  const [upperCase, setUpperCase] = useState<boolean>(true);
  const [numeric, setNumeric] = useState<boolean>(false);
  const [specialCharacter, setSpecialCharacter] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [rangeSliderValue, setRangeSliderValue] = useState<number[] | number>(
    15
  );
  const passTextRef = useRef<HTMLInputElement | null>(null);
  const [toast, setToast] = useState<boolean>(false);

  const alphabets: string[] = APLHABETS.split("");
  const numbers: string[] = NUMBERS.split("");
  const specialChar: string[] = SPECIAL_CHARACTERS.split("");

  let allChars: string[] = [];
  if (lowerCase)
    allChars = allChars.concat(alphabets.map((c) => c.toLowerCase()));
  if (upperCase)
    allChars = allChars.concat(alphabets.map((c) => c.toUpperCase()));
  if (numeric) allChars = allChars.concat(numbers);
  if (specialCharacter) allChars = allChars.concat(specialChar);

  const generatePassword = () => {
    const length =
      typeof rangeSliderValue === "number"
        ? rangeSliderValue
        : rangeSliderValue[0];
    let newPassword: string = "";

    for (let i = 0; i < length; i++) {
      const randomValue = Math.floor(Math.random() * allChars.length);
      newPassword += allChars[randomValue];
    }
    setPassword(newPassword);
  };

  const handleCheckBox = (option: keyof optionsState) => {
    const optionsState: optionsState = {
      upper: upperCase,
      lower: lowerCase,
      number: numeric,
      specialChar: specialCharacter,
    };

    const checkedCount = Object.values(optionsState).filter(Boolean).length;

    if (checkedCount === 1 && optionsState[option]) return;

    switch (option) {
      case "upper":
        setUpperCase(!upperCase);
        break;
      case "lower":
        setLowerCase(!lowerCase);
        break;
      case "number":
        setNumeric(!numeric);
        break;
      case "specialChar":
        setSpecialCharacter(!specialCharacter);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    generatePassword();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lowerCase, upperCase, numeric, specialCharacter, rangeSliderValue]);

  const handleCopyPass = async () => {
    if (passTextRef.current) {
      await navigator.clipboard.writeText(passTextRef.current.value);
      setToast(true);
    }
  };

  const handleClose = () => {
    setToast(false);
  };

  return (
    <React.Fragment>
      <div className="main">
        <div className="container">
          <h1 className="heading-1 text">Random Password Generator</h1>
          <h2 className="text">
            Create strong and secure passwords to keep your account safe online.
          </h2>
          <div>
            <div className="input__box__container">
              <input
                type="text"
                name="password"
                id="password"
                className="input__box"
                value={password}
                readOnly
                ref={passTextRef}
              />
              <RefreshIcon
                fontSize="large"
                className="refresh__icon"
                onClick={() => generatePassword()}
              />
            </div>
            <button className="copy__btn" onClick={handleCopyPass}>
              Copy
            </button>
          </div>
          <div className="pass__range__input__container">
            <h1 className="text">Password length: {rangeSliderValue}</h1>
            <Box sx={{ width: 300 }}>
              <Slider
                defaultValue={15}
                aria-label="Default"
                valueLabelDisplay="auto"
                min={1}
                max={50}
                onChange={(_, value) => {
                  setRangeSliderValue(value);
                }}
              />
            </Box>
          </div>
          <div className="check__box__container">
            <h1 className="text">Characters used:</h1>
            <div>
              <input
                type="checkbox"
                name="upperCase"
                id="uppper"
                checked={upperCase}
                onChange={() => handleCheckBox("upper")}
              />
              <label htmlFor="">ABC</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="lowerCase"
                id="lower"
                checked={lowerCase}
                onChange={() => handleCheckBox("lower")}
              />
              <label htmlFor="">abc</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="numeric"
                id="number"
                checked={numeric}
                onChange={() => handleCheckBox("number")}
              />
              <label htmlFor="">123</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="specialCharacter"
                id="specialChar"
                checked={specialCharacter}
                onChange={() => handleCheckBox("specialChar")}
              />
              <label htmlFor="">!@#</label>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={toast} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          Password copied to clipboard
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default App;
