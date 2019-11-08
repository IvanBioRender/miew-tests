import React, { useContext } from 'react';
import useForm from 'react-hook-form';

import { MiewContext } from './App';

const enum Database {
    PDB = 'pdb',
    PubChem = 'pubchem',
}

const Search = () => {
  const { viewer } = useContext(MiewContext);

  const {
    register, handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    let search;
    switch (data.db) {
      case Database.PDB:
        search = data.search;
        break;
      case Database.PubChem:
        search = `pc: ${data.search}`;
        break;
      default:
        console.error('Unhandled search type:', data.search);
        break;
    }

    try {
      await (viewer as any).load(search);
    } catch (err) {
      console.error('Error searching:', err);
    }
  };

  return (
    <section>
      <h2>Search</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="search" defaultValue="1CRN" ref={register({ required: true })} />
        <select name="db" defaultValue="pdb" ref={register({ required: true })}>
          <option value={Database.PDB}>PDB</option>
          <option value={Database.PubChem}>PubChem</option>
        </select>
      </form>
    </section>
  );
};

export default Search;
