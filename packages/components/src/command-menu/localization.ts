const commandMenuLocalization = {
    instructions: "Press 'Enter' to confirm your input or 'Escape' to cancel",
    inputLabel: "Type the name of a command to run.",
    footerArrowKeys: "Navigate",
    footerEnterKey: "Select",
    footerEscapeKey: "Esc to dismiss",
    footerBackspaceKey: "Move to parent",
    noResults: (searchTerm: string) => `No results for “${searchTerm}”`,
    tip: "Search tips: some search terms require exact match. Try typing the entire command name, or use a different word or phrase.",
  }
  
  export default commandMenuLocalization
  