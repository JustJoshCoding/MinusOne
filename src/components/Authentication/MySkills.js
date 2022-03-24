import React, {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Typography } from '@material-ui/core'

const MySkills = () => {
  const [docu, setDoc] = useState(false);
  const [web, setWeb] = useState(false);
  const [css, setCss] = useState(false);
  const [pro, setPro] = useState(false);
  const [lea, setLea] = useState(false);
  const [dat, setDat] = useState(false);
  const [res, setRes] = useState(false);
  const [ent, setEnt] = useState(false);
  const [bac, setBac] = useState(false);

  return {

    docu,
    web,
    css,
    pro,
    lea,
    dat,
    res,
    ent,
    bac,
    renderMySkills : (
    <Box sx={{ mt: 5, ml: 5}}>
        <Typography >Please Select Your Skills:</Typography>
        <FormGroup>
            <FormControlLabel control = {
            <Checkbox
              value={docu}
              checked={docu}
              onChange={(e) => setDoc(e.target.checked)}
            /> } label="Documentation" />
            <FormControlLabel control = {
            <Checkbox
              value={web}
              checked={web}
              onChange={(e) => setWeb(e.target.checked)}
            />} label="Web Design" />
            <FormControlLabel control = {
            <Checkbox
              value={css}
              checked={css}
              onChange={(e) => setCss(e.target.checked)}
            />} label="Css" />
            <FormControlLabel control = {
            <Checkbox
              value={pro}
              checked={pro}
              onChange={(e) => setPro(e.target.checked)}
            />} label="Programming" />
            <FormControlLabel control = {
            <Checkbox
              value={lea}
              checked={lea}
              onChange={(e) => setLea(e.target.checked)}
            />} label="Leadership" />
            <FormControlLabel control = {
            <Checkbox
              value={dat}
              checked={dat}
              onChange={(e) => setDat(e.target.checked)}
            />} label="Database Management" />
            <FormControlLabel control = {
            <Checkbox
              value={res}
              checked={res}
              onChange={(e) => setRes(e.target.checked)}
            />} label="Researching" />
            <FormControlLabel control = {
            <Checkbox
              value={ent}
              checked={ent}
              onChange={(e) => setEnt(e.target.checked)}
            />} label="Entrepreneur" />
            <FormControlLabel control = {
            <Checkbox
              value={bac}
              checked={bac}
              onChange={(e) => setBac(e.target.checked)}
            />} label="Backend Development" />
        </FormGroup>
    </Box>
  )}
}

export default MySkills