import 'mocha';
import { expect } from 'chai';
import {GraphModel} from './../model/GraphModel'
import {Point} from './../model/Point'
import {Vertex} from './../model/Vertex'


describe('Hello function', () => {

  it('should return hello world', () => {
    const result = "Hello world!";
    expect(result).to.equal('Hello world!');
  });

describe("Test of the adding existing vertex",()=>{
	var vertex:Vertex=new Vertex(new Point(0,0,false))
	var graphModel:GraphModel=GraphModel.createTestModel()
	
	it('should return false', () => {
  
    expect(graphModel.addVertex(vertex)).to.equal(false);
  });
})

describe("Test of the adding not existing vertex",()=>{
	var vertex:Vertex=new Vertex(new Point(0,0,false))
	var graphModel:GraphModel=GraphModel.createTestModel()
	
	it('should return true', () => {
  
    expect(graphModel.addVertex(vertex)).to.equal(false);
  });
})

});