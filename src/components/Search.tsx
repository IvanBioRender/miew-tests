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
    register, errors, setError, clearError, handleSubmit,
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
      await viewer.load(search, { keepRepsInfo: true });
    } catch (err) {
      console.error('Error searching:', err);
      setError('search', 'notFound', 'Error: search not found');
    }
  };

  const onChange = () => {
    clearError('search');
  };

  return (
    <section>
      <h2>Search</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="search" onChange={onChange} defaultValue="3CRN" ref={register({ required: true })} />
        <select name="db" defaultValue="pdb" ref={register({ required: true })}>
          <option value={Database.PDB}>PDB</option>
          <option value={Database.PubChem}>PubChem</option>
        </select>
      </form>
      {errors.search && <p className="error">{errors.search.message}</p>}
    </section>
  );
};

export default Search;
