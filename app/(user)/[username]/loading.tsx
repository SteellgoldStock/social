import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Container } from "@/components/container";

const ProfileLoadingPage = () => {
  return (
    <Container>
      <Card>
        <CardHeader className="p-1.5">
          <div className="relative">
            {/* Banner */}
            <Skeleton className="w-full h-32 rounded-t-lg" />

            <div className="shrink-0 flex items-center justify-start p-4">
              {/* Avatar */}
              <Skeleton className="h-20 w-20 rounded-full relative -mt-10 border-4 border-muted-foreground/5" />

              {/* Follow button */}
              <div className="absolute right-2 bottom-2.5 sm:bottom-6">
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Name */}
          <Skeleton className="h-7 w-40 mb-2" />
          
          {/* Username */}
          <div className="flex flex-row items-center gap-1 mb-4">
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Bio */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Followers/Following */}
          <div className="flex flex-row gap-4 mt-4 py-0.5 items-center">
            <div className="flex gap-1 items-center">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-16" />
            </div>

            <Skeleton className="h-1 w-1" />

            <div className="flex gap-1 items-center">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="my-4" />
    </Container>
  )
}

export default ProfileLoadingPage;