import 'package:flutter/material.dart';
import 'package:flutter_application_1/pages/MinhaPrimeiraPagina.dart';


class AlinhamnetoHorizontal extends StatelessWidget {
  const AlinhamnetoHorizontal({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Texto 1"),
            SizedBox(width: 50.0,),
            Text("Texto 2"),
            SizedBox(width: 5.0,),
            Text("Texto 3"),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(context, 
          MaterialPageRoute(builder: (context) => MinhaPrimeiraPagina()));
        },
      child: Icon(Icons.add),),
    );
  }
}