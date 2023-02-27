import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface Props {
  listFunc: string[],
}


export const SyntaxInteract = (props: Props) => {
  let codeString = "";
  for (let i = 0; i < props.listFunc.length; i++) {
    codeString = codeString + props.listFunc[i] + "\n\n";

  }
  return (    
    <SyntaxHighlighter language="javascript" style={materialDark} wrapLongLines={true}>
      {codeString}
    </SyntaxHighlighter>
  );
};