#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ProceduralMeshComponent.h"
#include "ProcMesh.generated.h"

UCLASS()
class PROCEDURALMESH_API AProcMesh : public AActor
{
	GENERATED_BODY()
	
	TArray<FVector> Vertices;
	TArray<int32> Triangles;
	TArray<FVector2D> UVs;

	UPROPERTY()
	UProceduralMeshComponent* ProcMesh;

	void CreateMesh();
public:
	
	// Sets default values for this actor's properties
	AProcMesh();
protected:
	UPROPERTY(EditAnywhere)
	UMaterialInterface* Material;
	
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;