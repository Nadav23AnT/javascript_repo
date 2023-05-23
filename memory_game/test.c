build_view( A[]){
  last_max = 0
  last_position = 0
  stack B
  last_max = A[0]
  B[0] = 0
  for i = 0 to n{
    if(A[i] < last_max){
      last_max = A[i]
      last_position = i
      B[i] = 0
    }
    else{
      B[i] = last_position
    }
  }
  
  
}