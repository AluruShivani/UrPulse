package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


//This collection is used for generating for all tables/collection sequences
/*
  Ex: 
 	database_sequences(
 	[
	 	{ 
	 		_id : "employee_squence",
	 		seq : 1,
	 	},
	 	
	 	{ 
	 		_id : "cutomer_squence",
	 		seq : 1001,
	 	}
	 	
	 	:
	] )
  
 */

@Document(collection = "database_sequences")
public class DatabaseSequences {

    @Id
    private String id;   //It stores sequence name

    private long seq;

    public DatabaseSequences() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getSeq() {
        return seq;
    }

    public void setSeq(long seq) {
        this.seq = seq;
    }
}
