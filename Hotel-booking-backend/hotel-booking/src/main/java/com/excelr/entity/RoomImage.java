package com.excelr.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class RoomImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] data;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "room_id")
    private Room room;
}

//When we annotate a field with @Lob, JPA will store the attribute in a database-supported large object type, such as BLOB (Binary Large Object) or CLOB (Character Large Object), depending on the type of data being stored.

//The @Column annotation with columnDefinition = "LONGBLOB" specifies the SQL column definition for image_data. In SQL databases like MySQL, LONGBLOB is a type that can hold large binary data, suitable for storing images and other large objects.