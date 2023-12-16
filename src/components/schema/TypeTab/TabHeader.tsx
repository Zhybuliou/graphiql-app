// import React from 'react';
//
// import { GraphQLField } from 'graphql';
// import FieldInfo from '../FieldInfo';
// import { TypeToExplorer } from '../types';
//
// type TabHeaderProps = {
//   typeToExplorer: TypeToExplorer;
// };
//
// function TabHeader({ typeToExplorer }: TabHeaderProps) {
//   if (typeToExplorer.args.length === 0) {
//     return (
//       <FieldInfo
//         name={typeToExplorer.name}
//         type={typeToExplorer.type.toString()}
//       />
//     );
//   }
//
//   return (
//     <div className="text-left">
//       <p>
//         <span className="text-red-700">{`${typeToExplorer.name}`}</span>(
//       </p>
//       {typeToExplorer.args.map((argument) => {
//         return (
//           <FieldInfo
//             key={`${argument.name}`}
//             name={argument.name}
//             type={argument.type.toString()}
//           />
//         );
//       })}
//       <p>
//         ):{' '}
//         <span className="text-amber-600">{typeToExplorer.type.toString()}</span>
//       </p>
//     </div>
//   );
// }
//
// export default TabHeader;
