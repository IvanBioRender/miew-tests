import React, { useContext, useEffect } from 'react';
import $ from 'jquery';
import 'jquery.terminal';
import Miew from 'miew';

import { MiewContext } from './App';

const Terminal = () => {
  const { viewer } = useContext(MiewContext);
  useEffect(() => {
    if (!viewer) return;
    $('#terminal').terminal((cmd, term) => {
      (viewer as Miew).script(cmd, (str) => {
        term.echo(str);
      }, (str) => {
        term.error(str);
      });
    });
  }, [viewer]);

  return (
    <div id="terminal-wrapper">
      <div id="terminal" />
    </div>
  );
};

export default Terminal;
