/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import { Button } from 'antd';
import axios from 'axios';
import { API } from '../../constants';
import asyncHandler from '../../utils/asyncHandler';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/special_characters.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { policyText } from './policyText';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import './index.scss';

const PolicyEdit = () => {
  const [model, setModel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPolicy = async () => {
      try {
        const { data } = await (await axios.get(`${API}/policy`)).data;
        if (!data.length) {
          const result = await axios.post(`${API}/policy`, { description: policyText });
          const { data: { data: { description } } } = result;
          return setModel(description);
        }
        const policy = data[0].description;
        setModel(policy);
      } catch (error) {
        if (error.response.data.message === 'Policy not exists') {
          await axios.post(`${API}/policy`, { description: policyText });
          window.location.reload();
        }
      }
    };

    asyncHandler(getPolicy, 'PolicyEdit - getPolicy');
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const { data } = await (await axios.get(`${API}/policy`)).data;
    const { id } = data[0];
    await axios.put(`${API}/policy/${id}`, { description: model });
    setIsLoading(false);
    window.location.reload();
  };

  const handleModelChange = (newModel) => {
    setModel(newModel);
  };

  return (
    <div className="edit-policy">
      <div className="edit-policy__actions">
        <Button
          className="edit-policy__cta"
          type="primary"
          size="large"
          onClick={handleSubmit}
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
      <FroalaEditor
        className="edit-policy__editor"
        tag="textarea"
        model={model}
        onModelChange={handleModelChange}
      />
    </div>
  );
};

export default PolicyEdit;
