export interface Model {

}
export interface Note {
title: string
description: string
color: string
createdDate: Date
modifiedDate: Date
id:string
imageUrl: string
isArchived: boolean
isDeleted: boolean
isPined: boolean
reminder: [Date]
noteLabels: Array<Label>
userId: string
labelIdList: [string]
noteCheckLists: Array<Checklists>
questionAndAnswerNotes:[object]
collaborators:[object]
}

export interface Label{
id: string
label: string
isDeleted: boolean
userId: string
}

export interface Checklists{
createdDate: Date
id: string
isDeleted: boolean
itemName: string
modifiedDate: Date
notesId: string
status: string
}


// export class Checklist implements Checklists {
//     private id:String;
//     private createdDate:Date;
//     private isDeleted:Boolean;
//     private itemName: String;
//     private modifiedDate: Date;
//     private notesId: String;
//     private status: Boolean;

//     constructor(private note: Note){
//         this.notesId = note.id;
//     }

//     getList(){

//     }

//     addList(){

//     }

//     removeList(){
        
//     }

//     updateList(){
        
//     }

//     sortList(){
        
//     }
// } 