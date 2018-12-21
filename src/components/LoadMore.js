import React from 'react';

export class LoadMore extends React.Component{
   render() {
       const {label, disabled, onClick} = this.props;
       return (
           <button className="btn btn-dark btn-block" onClick={onClick} disabled={disabled}>
               {label}
           </button>
       )
   }
}