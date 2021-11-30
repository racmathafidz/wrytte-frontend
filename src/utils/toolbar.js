const toolbar = {
  options: ['inline', 'blockType', 'list', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'monospace'],
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
};

export default toolbar;
