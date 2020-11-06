import 'mocha';
import { expect } from 'chai';
import {GraphModel} from './../model/GraphModel'
import {Point} from './../model/Point'
import {Vertex} from './../model/Vertex'
import {GraphView} from './../view/GraphView'

describe("Test of the graphViewInitialization",()=>{
	
	var graphView:GraphView=new GraphView()
	graphView.initialize()
	
	
	it('It will be two vertex in the dictionary', () => {
  		
  
  
    expect(graphView.vertexDictionary.size).to.equal(2);

  });
})